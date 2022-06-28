import { Router, Request, Response } from 'express';
import { nextTick } from 'process';
//import {fetch} from '@node-fetch'
const fetch = require('node-fetch');
const fs = require('fs');

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-type','application/json');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  let data = await fetch('https://api.github.com/users/silverorange/repos');
  let repos = await data.json();

  fs.readFile('data/repos.json','utf8',(err:any, data:any)=>{
    if (err){
      console.log(err);
      return;
    }
    let fileRepo = JSON.parse(data);
    let result = [...repos, ...fileRepo]
    result = result.filter((ele:any)=>{
      return ele.fork === false;
    });
    res.json(result);
  })
});
