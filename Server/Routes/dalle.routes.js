


import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv"



dotenv.config()


const router = express.Router();

const config = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config) 



router.route('/').post(async (req, res) => {
  try {
    const {prompt} = req.body;


    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format:"b64_json"
    });

    res.status(200).json({
      url:response.data.data[0].b64_json
    })

  } catch (error) {

    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router
