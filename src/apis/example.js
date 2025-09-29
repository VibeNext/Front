import { authClient } from "./instance";

/**
 * GET 요청
 */
const getExample = async () => {
  return await authClient.get(`/example`);
};

/**
 * POST 요청
 */
const postExample = async (title, content) => {
  return await authClient.post(
    `/example`,
    { title, content },
    { headers: { "Content-Type": "application/json" } }
  );
};

/**
 * PUT 요청
 */
const putExample = async (title, content) => {
  return await authClient.put(
    `/example`,
    { title, content },
    { headers: { "Content-Type": "application/json" } }
  );
};

/**
 * PATCH 요청
 */
const patchExample = async (content) => {
  return await authClient.patch(
    `/example`,
    { content },
    { headers: { "Content-Type": "application/json" } }
  );
};

/**
 * DELETE 요청
 */
const deleteExample = async () => {
  return await authClient.delete(`/example`);
};

export { getExample, postExample, putExample, patchExample, deleteExample };
