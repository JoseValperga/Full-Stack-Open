const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList)=>{
  let total = blogList.reduce((acumulador, objeto) => acumulador + objeto.likes, 0);
  return total;

};
module.exports = {
  dummy,
  totalLikes
};