# The Daily React - Sources & References

Here is a comprehensive list of all the documentation and resources used to build this project:

### Form Validation
- [React Hook Form - Get Started](https://react-hook-form.com/get-started)
- [React Hook Form - Advanced Usage](https://react-hook-form.com/advanced-usage)
- [Create a Login Form with React Hook Form](http://blog.stackademic.com/create-a-login-form-with-react-hook-form-package-ab1634a206c9)
- [How I implemented Zod and React Hook Form](https://medium.com/@vmaineng/how-i-implemented-zod-and-react-hook-form-for-register-component-and-lessons-i-ve-learned-3a51c4dd3894)
- [React Hook Form Validation with Zod](https://www.contentful.com/blog/react-hook-form-validation-zod/)

### UI & Styling
- Initial UI inspiration: [Stitch](https://stitch.withgoogle.com/projects/7105132658580232243)
- [React Hot Toast Libraries Compared](https://blog.logrocket.com/react-toast-libraries-compared-2025/)
- [How to use React Hot Toast](https://react-hot-toast.com/docs/toast#toastpromise)
- [Change behavior of navbar based on auth status](https://stackoverflow.com/questions/68535247/how-to-show-different-navbars-based-on-authentication-status-and-role)

### Authentication & Supabase
- [Supabase Quickstart - ReactJS](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Supabase Auth Quickstart](https://supabase.com/docs/guides/auth/quickstarts/react)
- [Disable Confirm Email requirement](https://www.reddit.com/r/Supabase/comments/1j58frn/how_to_disable_confirm_email_requirement_setting/)
- [Supabase Auth Context Setup](https://theodorusclarence.com/shorts/auth-context#typescript-version)
- [Supabase Auth Context Provider Issues](https://www.reddit.com/r/Supabase/comments/1jyqabl/supabase_auth_context_provider_is_late_to_the/)

### Database & Storage
- [Creating Tables in Supabase](https://supabase.com/docs/guides/database/tables)
- [Creating new Supabase Table](https://www.usenextbase.com/docs/v2/guides/creating-new-supabase-table)
- [Table structure per user](https://www.reddit.com/r/Supabase/comments/1az4xft/how_can_i_create_a_new_table_for_each_user_on/)
- [Uploading Image to Supabase Storage](https://www.reddit.com/r/Supabase/comments/18q5lus/how_do_i_upload_an_image_to_supabase_and_have_the/)
- [Creating Storage Buckets](https://supabase.com/docs/guides/storage/buckets/creating-buckets)
- [Standard Uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads)


*(Note: AI assistance was utilized to write security policies for creating, updating, deleting posts, and deleting images from Supabase storage and making this README.md file if you want the original typed please read SOURCES.md).*

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
