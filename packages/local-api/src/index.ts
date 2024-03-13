export const serve = (port: number, filename: string, dir: string) => {
  console.log(`Serving traffic on port ${port}`);
  console.log(`Saving/fetching cells from ${filename}`);
  console.log(`Files will be saved in ${dir}`);
};
