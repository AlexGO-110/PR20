import React, { useState, useEffect } from 'react';
import PostDetail from './PostDetail';
import PostForm from './PostForm';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Ошибка при загрузке постов:", error);
        }
    };

    const deletePost = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении поста:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Список постов</h1>
            <button onClick={fetchPosts}>Загрузить посты</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <button onClick={() => setSelectedPost(post)}>Подробнее</button>
                        <button onClick={() => deletePost(post.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            {selectedPost && <PostDetail post={selectedPost} />}
            <PostForm setPosts={setPosts} />
        </div>
    );
};

export default PostList;

