import { Worker } from "bullmq";

const connection = { host: "127.0.0.1", port: 6379 };

const worker = new Worker(
  "ai-suggestions",
  async job => {
    console.log("Processing job:", job.id, job.name, job.data);
    // Later: call OpenAI API + update DB
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error("Job failed", job?.id, err);
});

console.log("Worker started...");
