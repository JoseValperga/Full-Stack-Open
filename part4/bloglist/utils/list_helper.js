// eslint-disable-next-line no-unused-vars
const blogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  let total = blogList.reduce(
    (acumulador, objeto) => acumulador + objeto.likes,
    0
  );
  return total;
};

const favoriteBlog = (blogList) => {
  let objetoConMasLikes = blogList.reduce((objetoConMasLikes, objetoActual) => {
    return objetoActual.likes > objetoConMasLikes.likes
      ? objetoActual
      : objetoConMasLikes;
  }, blogList[0]);
  return objetoConMasLikes;
};

const mostBlogs = (blogList) => {
  let result = [{ author: blogList[0].author, blogs: 1 }];

  for (let i = 1; i < blogList.length; i++) {
    let found = false;
    for (let j = 0; j < result.length; j++) {
      if (blogList[i].author === result[j].author) {
        result[j].blogs++;
        found = true;
      }
    }
    if (!found) result.push({ author: blogList[i].author, blogs: 1 });
  }
  return result;

};



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
