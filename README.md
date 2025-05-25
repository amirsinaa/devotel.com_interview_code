# Smart Insurance Portal

Smart insurance application portal built with React.js, TypeScript and Vite.

## Implemented features

- **Dynamic Forms:** Renders forms based on schema fetched from API.
- **Conditional Logic:** Fields appear/disappear based on user input.
- **Nested & Dynamic Fields:** Supports nested groups and dynamic select options from API.
- **Validation:** Built-in validation for required fields, numbers, and patterns.
- **Autosave Drafts:** Saves incomplete form data as drafts (localStorage).
- **Dark Mode:** Toggle light/dark themes across the UI.
- **Localization:** Supports multiple languages (English/Farsi).
- **Unit Tests:** Implemented Vitest and React Testing Library for unit testing.
- **Drag-and-Drop Field Reordering:** Reorder grouped fields with drag-and-drop.
- **Customizable Application List:** View, filter, sort, paginate, and customize columns for submissions.

---

## Project Structure

```
src
├── assets/
├── modules/
│   └── core/
│       ├── api/
│       │   ├── client.ts
│       │   ├── insurance.ts
│       │   └── submission.ts
│       ├── i18n/
│       │   ├── translations.ts
│       │   └── context/
│       │       └── i18n.context.tsx
│       ├── hooks/
│       │   ├── use-translate.ts
│       │   └── use-theme.ts
│       └── layout/
│           └── navbar/
│               ├── Navbar.tsx
│               └── navbar.module.css
│
├── form/
│   ├── components/
│   │   ├── dynamic-form.tsx
│   │   └── fields/
│   │       ├── checkbox.tsx
│   │       ├── date.tsx
│   │       ├── group.tsx
│   │       ├── number.tsx
│   │       ├── radio.tsx
│   │       ├── select.tsx
│   │       └── text.tsx
│   ├── form.module.css
│   └── hooks/
│       └── use-autosave.ts
│
├── list/
│   ├── application-table.tsx
│   ├── column-selector.tsx
│   └── application-table.module.css
│
├── context/
│   └── theme.context.tsx
│
├── pages/
│   ├── apply.tsx
│   ├── home.tsx
│   └── submission.tsx
│
├── hooks/
│   ├── use-theme.ts
│   └── use-translate.ts
│
├── types/
│   ├── form.ts
│   └── submission.ts
│
├── router.tsx
├── App.tsx
├── main.tsx
├── setupTests.ts
└── tests/
└── dynamic-form.test.tsx
```

---

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install```

2. **Start development server:**

   ```bash
   pnpm dev
   ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Run tests:**

   ```bash
   pnpm test
   ```

4. **Build for production:**

   ```bash
   pnpm build && pnpm preview
   ```

---

## API Usage

All forms and submissions are dynamic and **fetched from the backend API**.

### Base URL

```
https://assignment.devotel.io
```

### Endpoints

* **Get Forms:**
  `GET /api/insurance/forms`
  Fetches all available insurance form schemas.

* **Submit Form:**
  `POST /api/insurance/forms/submit`
  Submits a filled insurance form.

* **Get Submissions:**
  `GET /api/insurance/forms/submissions`
  Fetches all submitted applications.

**See code in `/src/modules/core/api` for usage.**

---

## Assumptions

* The backend API strictly follows the structure described in the assignment document.
* All forms are described by a schema returned from the API (no hardcoding).
* The app supports English and Persian by default; more languages can be added in `/src/modules/core/i18n/translations.ts`.
* Autosaved drafts are stored in `localStorage` and cleared after successful submit.
* Responsive UI is assumed for both desktop and mobile.
* Application table columns/fields are dynamic and match the API-provided columns.

---

## Dynamic Form Logic

### Form Schema

Each form schema includes:

* `formId`: Unique ID for the form.
* `title`: Title of the form.
* `fields`: Array of field definitions.

### Field Types

* **text:** Single-line text input
* **number:** Numeric input (with min/max)
* **date:** Date input
* **select:** Dropdown (static or dynamic options)
* **radio:** Radio group
* **checkbox:** Checkbox or group
* **group:** Nested/grouped fields (with drag-and-drop reordering)

### Field Visibility

Fields can appear/disappear based on other fields:

```json
{
  "visibility": {
    "dependsOn": "someField",
    "condition": "equals",
    "value": "someValue"
  }
}
```

Supported conditions: `equals`, `notEquals`, `gt`, `lt`.

### Dynamic Options

Some select fields fetch their options from an endpoint.
Example: states based on selected country.

---

## Submitted applications List View

* Columns: **Selectable** (choose which columns to display)
* Sorting: **Clickable** on column headers
* Search: **Instant filter** by any value
* Pagination: **Page controls** at the bottom

---

## Author

* [Amirsina Shadkami](https://github.com/amirsinaa)

---