import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  active: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit {
  // Signals de estado
  students = signal<Student[]>([]);
  searchTerm = signal<string>('');
  selectedCourse = signal<string>('all');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals para filtros e estatísticas
  filteredStudents = computed(() => {
    const students = this.students();
    const searchTerm = this.searchTerm().toLowerCase();
    const selectedCourse = this.selectedCourse();

    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                           student.email.toLowerCase().includes(searchTerm);
      const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
      
      return matchesSearch && matchesCourse;
    });
  });

  totalStudents = computed(() => this.students().length);
  activeStudents = computed(() => this.students().filter(s => s.active).length);
  inactiveStudents = computed(() => this.students().filter(s => !s.active).length);

  // Computed para cursos únicos
  availableCourses = computed(() => {
    const courses = this.students().map(s => s.course);
    return [...new Set(courses)].sort();
  });

  // Computed para estatísticas por curso
  courseStats = computed(() => {
    const students = this.students();
    const stats = new Map<string, { total: number; active: number }>();

    students.forEach(student => {
      const current = stats.get(student.course) || { total: 0, active: 0 };
      stats.set(student.course, {
        total: current.total + 1,
        active: current.active + (student.active ? 1 : 0)
      });
    });

    return Array.from(stats.entries()).map(([course, data]) => ({
      course,
      total: data.total,
      active: data.active,
      percentage: Math.round((data.active / data.total) * 100)
    }));
  });

  // Effect para monitorar mudanças
  constructor() {
    // Effect para logging (executado quando signals mudam)
    effect(() => {
      console.log(`Total de estudantes filtrados: ${this.filteredStudents().length}`);
    });

    // Effect para salvar no localStorage
    effect(() => {
      const students = this.students();
      if (students.length > 0) {
        localStorage.setItem('students', JSON.stringify(students));
      }
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  // Métodos para atualizar signals
  loadStudents(): void {
    this.loading.set(true);
    this.error.set(null);

    // Simular carregamento de dados
    setTimeout(() => {
      try {
        // Tentar carregar do localStorage primeiro
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          this.students.set(JSON.parse(savedStudents));
        } else {
          // Dados mock
          this.students.set(this.generateMockStudents());
        }
        this.loading.set(false);
      } catch (error) {
        this.error.set('Erro ao carregar estudantes');
        this.loading.set(false);
      }
    }, 1000);
  }

  addStudent(name: string, email: string, course: string): void {
    if (!name || !email || !course) {
      this.error.set('Preencha todos os campos obrigatórios');
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      email,
      course,
      active: true,
      createdAt: new Date()
    };

    this.students.update(students => [...students, newStudent]);
    this.error.set(null);
  }

  toggleStudentStatus(studentId: number): void {
    this.students.update(students =>
      students.map(student =>
        student.id === studentId
          ? { ...student, active: !student.active }
          : student
      )
    );
  }

  deleteStudent(studentId: number): void {
    this.students.update(students =>
      students.filter(student => student.id !== studentId)
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  updateSelectedCourse(course: string): void {
    this.selectedCourse.set(course);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCourse.set('all');
  }

  private generateMockStudents(): Student[] {
    return [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao@email.com',
        course: 'Engenharia de Software',
        active: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@email.com',
        course: 'Ciência da Computação',
        active: true,
        createdAt: new Date('2024-01-20')
      },
      {
        id: 3,
        name: 'Pedro Oliveira',
        email: 'pedro@email.com',
        course: 'Sistemas de Informação',
        active: false,
        createdAt: new Date('2024-02-01')
      },
      {
        id: 4,
        name: 'Ana Costa',
        email: 'ana@email.com',
        course: 'Engenharia de Software',
        active: true,
        createdAt: new Date('2024-02-10')
      }
    ];
  }
} 