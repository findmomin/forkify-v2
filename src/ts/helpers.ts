import * as Interfaces from './Interfaces';
import * as config from './config';

const timeout = (delay: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${delay} second`));
    }, delay * 1000);
  });
};

export const getJSON = async (url: string) => {
  try {
    const res = (await Promise.race([
      fetch(`${url}`),
      timeout(config.TIMEOUT_SEC),
    ])) as Response;
    const data = await res.json();

    if (!res.ok)
      throw new Error(
        `${(data as Interfaces.RecipeErrorResponse).message} ${res.status}`
      );

    return data;
  } catch (err) {
    throw err;
  }
};
