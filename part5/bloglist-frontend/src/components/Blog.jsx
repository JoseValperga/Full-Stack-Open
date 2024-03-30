const Blog = ({ blog }) => (
  <div>
    <p>{blog.title}</p> 
    <p>{blog.author}</p>
    <p>{blog.url}</p>
  </div>  
)

export default Blog