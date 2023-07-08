const Cache = require("node-cache");
const connectionCache = new Cache();

const CacheSetKey = (req, res, next) => {
  const startid=req.body.userid;
  const connectionarray=req.body.connections;
  connectionCache.set(startid,connectionarray);
  return next;
};

const CacheGetKey = (req, res, next) => {
  const startid=req.body.userid;
  if (connectionCache.has(startid)){
    res.locals.connectionarray=connectionCache.get(startid);
  }
  else{
    res.locals.connectionarray=[];
  }
  return next;
};

module.exports = {
  CacheSetKey,CacheGetKey,
  connectionCache,
};
