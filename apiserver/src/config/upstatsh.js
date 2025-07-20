import {Ratelimit} from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
//console.log("Connecting to Redis:", process.env.UPSTASH_REDIS_REST_URL);
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s")
});
export default ratelimit;


