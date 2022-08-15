import Appbutton from "../../reusableComps/Appbutton";
import RenderIf from "../../reusableComps/RenderIf";

const BlogPost = ({ loggedIn = true, isOwnPost = true }) => {
  const handleEditBlog = () => {};
  const handleDeleteBlog = () => {};
  return (
    // Find a way to navigate back home. goBack button at top? Finish Create A blog page {type of form}. Then think about personal blogs display ! Own Profile.

    <div className="singleBlogPost">
      <h2>THIS IS THE BLOG TITLE</h2>
      <div className="blogImage">
        <img
          className="blog-img"
          src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        />
      </div>
      {/* STRING SPLIT TO DETECT LINE BREAK let separateLines = str.split(/\r?\n|\r|\n/g); */}
      <p className={`blogText`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eos
        molestias enim, eum totam incidunt possimus vitae accusamus saepe ab
        obcaecati, facere porro eius quisquam officia beatae nihil quam magnam.
        Voluptate libero dolorem sint hic aspernatur perferendis aut quos
        distinctio! Ipsam, odio et nulla eaque dignissimos distinctio iusto,
        iure id assumenda officiis nobis quos. Laborum dolorem tempore ullam
        porro odit? Error commodi eum corporis ducimus dicta quas reprehenderit
        illo nobis voluptatum tenetur nesciunt quam at, dolorem saepe ipsum
        repellendus non impedit alias nam incidunt tempore consectetur dolore
        distinctio! Voluptatibus, exercitationem! Ullam, eveniet, quas
        blanditiis molestias voluptas excepturi ducimus eaque delectus culpa,
        sint magni in aliquam aperiam quidem. Ipsa, nulla dolores voluptatibus
        esse, veritatis assumenda alias blanditiis impedit, sit cumque
        provident? Deserunt vero consequatur earum magni accusantium impedit
        suscipit, enim rem alias, provident pariatur amet magnam quis.
      </p>
      <RenderIf isTrue={loggedIn && isOwnPost}>
        <div className="actionButtons">
          <Appbutton title="Edit" className={"appButton"} />
          <Appbutton title="Delete" className={"appButton"} />
        </div>
      </RenderIf>
    </div>
  );
};

export default BlogPost;
