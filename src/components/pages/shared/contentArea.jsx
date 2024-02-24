import React from "react";
import { useSelector, useDispatch } from "react-redux";

function contentArea() {
  return (
    <section className="Content-area">
      <h2 className="Content-title">Content Title</h2>
      <div>Content</div>
      {/* Add your content above accordingly, retrieve the reducer state and render */}
    </section>
  );
}

export default contentArea;
