# Todo App - Clean Architecture Demo

A demonstration repository showcasing clean architecture patterns with Next.js, Turborepo, and TypeScript.

## Patterns Demonstrated

### 1. Use Case Pattern

Use cases encapsulate business logic in classes with dependency injection.

```typescript
// apps/web/app/todos/useCases/CreateTodoUseCase/CreateTodoUseCase.ts

export type CreateTodoRequest = {
  title: string;
};

export type CreateTodoResponse = {
  todoId: string;
};

export class CreateTodoUseCase {
  constructor(private todoGateway: TodoGateway) {}

  async createTodo(request: CreateTodoRequest): Promise<CreateTodoResponse> {
    const id = uuid();
    const now = new Date();
    const todo = new Todo(id, request.title, false, now, now);
    await this.todoGateway.createTodo(todo);
    return { todoId: id };
  }
}
```

### 2. Server Actions Pattern

Actions wrap use cases and handle dependency injection with the `'use server'` directive.

```typescript
// apps/web/app/todos/useCases/CreateTodoUseCase/CreateTodoUseCaseActions.ts

'use server';

export const CreateTodoUseCaseCreateTodoAction = async (
  request: CreateTodoRequest,
): Promise<CreateTodoResponse> => {
  const useCase = createCreateTodoUseCase();
  return useCase.createTodo(request);
};

const createCreateTodoUseCase = (): CreateTodoUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new CreateTodoUseCase(new TodoGatewayImpl(pool));
};
```

### 3. React Query Hooks Pattern

Hooks wrap actions for use in React components.

```typescript
// apps/web/app/todos/useCases/CreateTodoUseCase/useCreateTodo.ts

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'create'],
    mutationFn: async (title: string) => {
      return CreateTodoUseCaseCreateTodoAction({ title });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
```

### 4. Gateway Pattern

Gateways provide an abstraction layer for data access with separate implementations.

**Interface:**

```typescript
// packages/gateways/src/TodoGateway/TodoGateway.ts

export interface TodoGateway {
  createTodo(todo: Todo): Promise<void>;
  getTodo(id: string): Promise<Todo | undefined>;
  getTodos(): Promise<Todo[]>;
  updateTodo(todo: Todo): Promise<void>;
  deleteTodo(id: string): Promise<void>;
}
```

**Real Implementation (with @nearform/sql):**

```typescript
// packages/gateways/src/TodoGateway/command/impls/createTodo.ts

export const createTodo = async (pool: pg.Pool, todo: Todo): Promise<void> => {
  const query = SQL`
    INSERT INTO ${SQL.unsafe(TODO_TABLE_NAME)} (
      ${SQL.unsafe(TodoTableFieldNames.id)},
      ${SQL.unsafe(TodoTableFieldNames.title)},
      ${SQL.unsafe(TodoTableFieldNames.completed)},
      ${SQL.unsafe(TodoTableFieldNames.created_at)},
      ${SQL.unsafe(TodoTableFieldNames.updated_at)}
    ) VALUES (
      ${todo.id},
      ${todo.title},
      ${todo.completed},
      ${todo.createdAt},
      ${todo.updatedAt}
    )
  `;
  await pool.query(query.text, query.values);
};
```

**In-Memory Implementation (for testing):**

```typescript
// packages/gateways/src/TodoGateway/inMemoryStores/InMemoryTodoGateway.ts

export class InMemoryTodoGateway implements TodoGateway {
  private todos: InMemoryTodoStore = new Map();

  async createTodo(todo: Todo): Promise<void> {
    return createTodo(this.todos, todo);
  }

  // ... other methods
}
```

### 5. Testing Patterns

**Use Case Tests with In-Memory Gateway:**

```typescript
// apps/web/app/todos/useCases/CreateTodoUseCase/_tests/CreateTodoUseCase.spec.ts

type TestContext = {
  todoGateway: InMemoryTodoGateway;
  createUseCase: () => CreateTodoUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));
  const todoGateway = new InMemoryTodoGateway();

  const createUseCase = (): CreateTodoUseCase => {
    return new CreateTodoUseCase(todoGateway);
  };

  return { todoGateway, createUseCase };
};

describe('CreateTodoUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should create a todo with the given title', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createTodo({ title: 'Buy groceries' });

    // Verify state change in gateway
    const createdTodo = await ctx.todoGateway.getTodo(response.todoId);
    expect(createdTodo!.title).toBe('Buy groceries');
    expect(createdTodo!.completed).toBe(false);
  });
});
```

**Gateway Tests with Docker:**

```typescript
// packages/gateways/src/TodoGateway/command/impls/_tests/createTodo.spec.ts

describe('createTodo', () => {
  let pool: pg.Pool;

  beforeAll(async () => {
    pool = await setupTodoTestDatabase(TEST_DB_CONNECTION_STRING);
  });

  afterAll(async () => {
    await teardownTodoTestDatabase(pool);
  });

  beforeEach(async () => {
    await cleanupTodoTestData(pool);
  });

  it('should create a todo with all fields', async () => {
    const todo = new Todo('1', 'Test Todo', false, now, now);
    await createTodo(pool, todo);

    const retrieved = await getTodo(pool, '1');
    expect(retrieved!.title).toBe('Test Todo');
  });
});
```

## Project Structure

```
todo-nextjs-clean-architecture/
├── apps/
│   └── web/                          # Next.js app
│       ├── app/
│       │   ├── page.tsx
│       │   ├── layout.tsx
│       │   └── todos/
│       │       ├── TodoPage.tsx      # Container component
│       │       ├── components/
│       │       │   ├── TodoList.tsx  # Presentational
│       │       │   └── TodoForm.tsx
│       │       └── useCases/
│       │           ├── CreateTodoUseCase/
│       │           │   ├── CreateTodoUseCase.ts
│       │           │   ├── CreateTodoUseCaseActions.ts
│       │           │   ├── useCreateTodo.ts
│       │           │   └── _tests/
│       │           ├── GetTodosUseCase/
│       │           ├── ToggleTodoUseCase/
│       │           └── DeleteTodoUseCase/
│       └── providers/
│           └── QueryProvider.tsx
├── packages/
│   ├── entities/                     # Domain entities
│   │   └── src/Todo/
│   │       ├── Todo.ts
│   │       └── Todo.testUtils.ts
│   ├── gateways/                     # Data access layer
│   │   └── src/
│   │       ├── TodoGateway/
│   │       │   ├── TodoGateway.ts         # Interface
│   │       │   ├── TodoGatewayImpl.ts     # Real impl
│   │       │   ├── command/
│   │       │   │   ├── impls/             # Real DB impl
│   │       │   │   └── inMemory/          # In-memory impl
│   │       │   ├── query/
│   │       │   └── inMemoryStores/
│   │       │       └── InMemoryTodoGateway.ts
│   │       ├── tableUtils/
│   │       └── poolUtils.ts
│   ├── utils/                        # Shared utilities
│   │   └── src/
│   │       ├── uuid.ts
│   │       └── date.ts
│   └── typescript-config/            # Shared TS configs
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── vitest.config.mts
```

## Docker Setup for Gateway Tests

The gateway tests require a PostgreSQL database. Set up a long-running container:

```bash
docker run -d \
  --name postgres-test \
  -e POSTGRES_PASSWORD=test \
  -e POSTGRES_USER=testuser \
  -e POSTGRES_DB=testdb \
  -p 5432:5432 \
  --restart unless-stopped \
  postgres:16
```

To stop and remove:

```bash
docker stop postgres-test && docker rm postgres-test
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- Docker (for gateway tests)

### Installation

```bash
pnpm install
```

### Environment Setup

Create `.env` in `apps/web/`:

```env
POSTGRES_URL=postgresql://testuser:test@localhost:5432/testdb
```

### Running the App

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start
```

### Running Tests

```bash
# Start the test database (if not already running)
docker start postgres-test

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type check
pnpm ts
```

## Key Principles

1. **Dependency Injection**: Use cases receive gateways through constructor injection
2. **Clean Separation**: Business logic in use cases, not in UI components or actions
3. **DTOs**: Request/Response types use plain objects (no Date, no Entity objects)
4. **Test State Changes**: Tests verify state changes in gateways, not method calls
5. **In-Memory Testing**: Use cases are tested with in-memory gateways for speed
6. **Real DB Testing**: Gateway implementations are tested against real PostgreSQL
7. **No Barrel Exports**: Each file is explicitly exported in package.json

## Technologies

- **Framework**: Next.js 15 with App Router
- **UI**: MUI (Material UI)
- **State Management**: React Query
- **Database**: PostgreSQL with @nearform/sql
- **Testing**: Vitest
- **Formatting**: Prettier (ESLint is not used)
- **Monorepo**: Turborepo with pnpm workspaces
