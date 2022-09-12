## LabenuSystem

### Integrantes

Márleo Piber da Rosa,
Olavo Marques,
Raquel Bürger

### Documentação Postaman

https://documenter.getpostman.com/view/19799416/2s7YYoBmww


### A API

O sistema conta com três entidades principais.

1. Estudantes

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele.

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 6 ou `undefined`, indicando que as aulas dessa turma ainda não começaram.

As funcionalidades básicas são:

→ Criar estudante;

→ Buscar estudante por nome ou todos;

→ Adicionar/Editar turma atual do estudante;

→ Criar docente;

→ Buscar docentes;

→ Editar turma atual do docente;

→ Criar turma;

→ Buscar turmas;

→ Editar módulo da turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;
