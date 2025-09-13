// src/utils/mockApi.ts
export async function loginUser(email: string, password: string): Promise<boolean> {
  // This accepts any email/password as "correct" except it's empty
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email === "admin@lendsqr.com" && password === "admin123");
    }, 1000);
  });
}
