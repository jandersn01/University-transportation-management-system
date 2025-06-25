# Guia de Implementação de Signals no Angular

Este projeto implementa **Angular Signals**, uma nova API reativa introduzida no Angular 16+ que oferece uma forma mais eficiente e declarativa de gerenciar estado reativo.

## 🚀 O que são Signals?

Signals são primitivos reativos que notificam consumidores quando seu valor muda. Eles oferecem:

- **Reatividade granular**: Apenas os componentes que dependem de um signal específico são atualizados
- **Performance otimizada**: Change detection mais eficiente
- **Simplicidade**: API mais simples que RxJS para casos de uso básicos
- **Type safety**: Totalmente tipado com TypeScript

## 📁 Estrutura Implementada

### 1. LayoutService (`src/app/services/layout.service.ts`)

Serviço central que gerencia o estado do layout usando signals:

```typescript
// Signals privados para controle interno
private _collapsed = signal<boolean>(false);
private _screenWidth = signal<number>(0);

// Signals públicos readonly
collapsed = this._collapsed.asReadonly();
screenWidth = this._screenWidth.asReadonly();

// Computed signals para cálculos derivados
bodyClass = computed(() => {
  const collapsed = this._collapsed();
  const screenWidth = this._screenWidth();
  // Lógica de cálculo...
});
```

### 2. App Component (`src/app/app.ts`)

Componente principal atualizado para usar signals:

```typescript
// Injeção do serviço usando inject()
protected layoutService = inject(LayoutService);

// Signals do serviço disponíveis no template
collapsed = this.layoutService.collapsed;
screenWidth = this.layoutService.screenWidth;
```

### 3. StudentManagementComponent (Exemplo Avançado)

Componente completo demonstrando uso avançado de signals:

```typescript
// Signals de estado
students = signal<Student[]>([]);
searchTerm = signal<string>('');
selectedCourse = signal<string>('all');

// Computed signals para filtros
filteredStudents = computed(() => {
  // Lógica de filtro usando signals
});

// Effects para side effects
constructor() {
  effect(() => {
    console.log(`Estudantes filtrados: ${this.filteredStudents().length}`);
  });
}
```

## 🔧 Principais Conceitos Implementados

### 1. **Basic Signals**
```typescript
// Criação
const count = signal(0);

// Leitura
console.log(count()); // 0

// Escrita
count.set(1);
count.update(value => value + 1);
```

### 2. **Computed Signals**
```typescript
const doubled = computed(() => count() * 2);
// Atualiza automaticamente quando count muda
```

### 3. **Effects**
```typescript
effect(() => {
  console.log('Count changed:', count());
});
// Executa sempre que count muda
```

### 4. **Readonly Signals**
```typescript
private _count = signal(0);
count = this._count.asReadonly();
// Expõe apenas leitura externamente
```

## 🎯 Vantagens dos Signals

### Performance
- **Change Detection Otimizada**: Apenas componentes que dependem do signal são verificados
- **Granularidade**: Atualizações precisas sem re-renderização desnecessária

### Simplicidade
- **API Intuitiva**: Mais simples que RxJS para casos básicos
- **Menos Boilerplate**: Menos código comparado a outros padrões de estado

### Reatividade
- **Automática**: Computed signals se atualizam automaticamente
- **Sincronização**: Estado sempre consistente

## 🔄 Migração de Código Tradicional

### Antes (Propriedades Tradicionais)
```typescript
export class Component {
  count = 0;
  doubled = 0;

  increment() {
    this.count++;
    this.doubled = this.count * 2; // Manual
  }
}
```

### Depois (Signals)
```typescript
export class Component {
  count = signal(0);
  doubled = computed(() => this.count() * 2); // Automático

  increment() {
    this.count.update(n => n + 1);
  }
}
```

## 📖 Uso no Template

### Leitura de Signals
```html
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
```

### Binding de Propriedades
```html
<input [value]="searchTerm()" (input)="updateSearch($event)">
```

### Diretivas Estruturais
```html
<div *ngIf="loading()">Carregando...</div>
<div *ngFor="let item of filteredItems()">{{ item.name }}</div>
```

## 🛠️ Boas Práticas

1. **Use readonly para exposição pública**
   ```typescript
   private _data = signal([]);
   data = this._data.asReadonly();
   ```

2. **Prefira computed para cálculos derivados**
   ```typescript
   total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));
   ```

3. **Use effects para side effects**
   ```typescript
   effect(() => {
     localStorage.setItem('data', JSON.stringify(this.data()));
   });
   ```

4. **Mantenha signals simples e focados**
   ```typescript
   // ✅ Bom - específico
   userName = signal('');
   userEmail = signal('');
   
   // ❌ Evite - muito genérico
   userData = signal({});
   ```

## 🎨 Integração com Tailwind CSS

O projeto usa Tailwind CSS para estilização, que funciona perfeitamente com signals:

```html
<div [class]="getClasses()">
  <!-- Computed signal para classes CSS -->
</div>
```

```typescript
getClasses = computed(() => {
  const base = 'p-4 rounded';
  const status = this.isActive() ? 'bg-green-500' : 'bg-gray-500';
  return `${base} ${status}`;
});
```

## 🚀 Próximos Passos

1. **Explore os exemplos**: Analise o código do `StudentManagementComponent`
2. **Implemente em outros componentes**: Migre componentes existentes para usar signals
3. **Otimize performance**: Use signals para otimizar change detection
4. **Crie services reativos**: Implemente mais services usando signals

## 📚 Recursos Adicionais

- [Documentação Oficial Angular Signals](https://angular.io/guide/signals)
- [Angular Blog - Introducing Angular Signals](https://blog.angular.io/angular-signals-in-developer-preview-6a7ff1941823)
- [Performance Benefits of Signals](https://angular.io/guide/signals#performance-benefits)

---

**Nota**: Este projeto usa Angular 20.0.0 com suporte completo a signals. Certifique-se de que sua versão do Angular suporte esta funcionalidade. 