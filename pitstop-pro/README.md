# PitStop Pro 🚗

**PitStop Pro** é uma aplicação web desenvolvida com o objetivo de ajudar os utilizadores a gerir os seus veículos, manutenções, inspeções, impostos, documentos e outras tarefas associadas.

Projeto desenvolvido no âmbito do curso **Fullstack Web Developer** da Flag, 2025.

---

## 🚀 Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/) – Auth + Firestore
- [Tailwind CSS](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📦 Funcionalidades Implementadas

- Autenticação com Firebase (registo, login, recuperação de password)
- Dashboard com listagem de veículos
- Formulário para adicionar, editar e eliminar veículos
- Gestão de manutenções com inputs editáveis e mock de dados
- Página de definições do utilizador com:
  - Edição de perfil
  - Alteração de password
  - Apagar conta
- Responsividade mobile
- Dark mode parcialmente preparado
- Interface moderna e intuitiva

---

## 🔧 Como correr localmente

1. Clonar o repositório:
   ```bash
   git clone https://github.com/PEREIRAD01/pitstop-pro.git
   cd pitstop-pro

2. Instalar dependências:

npm install

3. Criar um ficheiro .env com as variáveis do Firebase:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...


4. Iniciar o projeto:
npm run dev

Autor:
Daniel Pereira – github.com/PEREIRAD01

Formador:
Francisco Costa

Nota
Este projeto é um MVP funcional e com espaço claro para evolução futura (upload de documentos, notificações, APIs externas, entre outros).