// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import SanityClient from "@sanity/client";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === "production" // `false` if you want to ensure fresh data
};

const client = SanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { _id, email, name, comment } = JSON.parse(req.body);

    try {
      await client.create({
        _type: "comment",
        post: {
          _type: "reference",
          _ref: _id,
        },
        name,
        email,
        comment,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong", error });
    }
    return res.status(200).json({ message: "Successfully Submitted", status: "success"});
}
