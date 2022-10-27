# ReactJS

## Create a new project

```shell
npx create-react-app
```

---

## How to install libraries

**- NPM:**

```shell
npm install lib-name

# or
npm i lib-name

# or install to dev dependencies
npm i lib-name -D
```

**- YARN:**

```shell
yarn add lib-name

# or install to dev dependencies
yarn add lib-name -D
```

---

## Folder structure

**- src:** Chứa source code chính của dự án

**- public:** Thư mục gốc của web server (máy chủ web), chứa các file công khai

**- node_modules:** Thư mục chứa toàn bộ thư viện được cài đặt trong dự án.
Để có thể import được thư viện khi viết code thì thư viện đó phải nằm trong node_modules. Thư mục được sinh ra khi `npm install` hoặc `yarn`

**-package.json:** Quản lý các thư viện được chủ động cài đặt trong dự án

**- yarn.lock, package-lock.json:** Quản lý chi tiết toàn bộ các thư viện có trong dự án
(Bao gồm toàn bộ các thư viện phụ thuộc)

## New structure

**- src/containers:** Thư mục chứa các component xử lý logic nghiệp vụ (business logic)

**- src/components:** Thư mục chứa các component cho phần view

**- src/packages:** Thư mục chứa các thư viện tự viết của dự án


tạo entity for { videoWidth, render account, create time post item}