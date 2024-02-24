


import express from 'express';
import { Configuration, OpenAIApi } from 'openai';






const router = express.Router();

const config = new Configuration({
  apiKey:"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",
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
