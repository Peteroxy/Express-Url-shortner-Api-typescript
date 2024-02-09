import express from 'express';
import { urlModel } from '../model/shortUrl';


export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log('The Url to be shortened is', req.body.fullUrl);
        const { fullUrl } = req.body;
        const foundUrl = await urlModel.find({ fullUrl});
        if (foundUrl.length > 0) {
            res.status(409);
            res.send(foundUrl);
        }
        else {
            const shortUrl = await urlModel.create({ fullUrl });
            res.status(201);
            res.send(shortUrl)
        }

    } catch (error) {
        res.status(400).send({ message: "something went wrong" });
    }
};


export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find();
        if (shortUrls.length < 0) {
            res.status(400).send({ message: "no url found" })
        }
        else {
            res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(400).send({ message: "something went wrong" });
    }

};

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
      const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
      if (!shortUrl) {
        res.status(404).send({ message: "Full Url not found!" });
      } else {
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`);
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  };
  

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "this link has been deleted" });
        }
    } catch (error) {
        res.status(400).send({ message: "something went wrong" });
    }
}