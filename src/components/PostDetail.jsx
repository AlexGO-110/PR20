import React from 'react';

const PostDetail = ({ post }) => {
    return (
        <div>
            <h2>Детали поста</h2>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
};

export default PostDetail;

