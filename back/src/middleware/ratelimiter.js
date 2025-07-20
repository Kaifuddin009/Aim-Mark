import ratelimit from "../config/upstatsh.js";
const ratelimiter = async(req, res, next)=>{
  try {
    const {success} = await ratelimit.limit("my-rate-limit")
    if (!success) {
      return res.status(429).json({message:"too many request: please try agsin later"})
    }
    next()
  } catch (error) {
    console.log("rate limit error",error)
    next(error)
  }
}
export default ratelimiter;