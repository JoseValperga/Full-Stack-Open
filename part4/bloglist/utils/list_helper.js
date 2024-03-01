// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  let total = blogList.reduce((acumulador, objeto) => acumulador + objeto.likes, 0);
  return total;
};

const favoriteBlog = (blogList) => {
  let objetoConMasLikes = blogList.reduce((objetoConMasLikes, objetoActual) => {
    return objetoActual.likes > objetoConMasLikes.likes ? objetoActual : objetoConMasLikes;
  }, blogList[0]);
  return objetoConMasLikes;

};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};