import React, { useState } from 'react';

const PostForm = ({ setPosts, postToEdit }) => {
    const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
    const [body, setBody] = useState(postToEdit ? postToEdit.body : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = postToEdit ? 'PUT' : 'POST';
        const url = postToEdit 
            ? `https://jsonplaceholder.typicode.com/posts/${postToEdit.id}`
            : 'https://jsonplaceholder.typicode.com/posts';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    body,
                    userId: 1, // или другой id пользователя
                }),
            });
            const newPost = await response.json();
            setPosts(prevPosts => {
                if (postToEdit) {
                    return prevPosts.map(post => post.id === newPost.id ? newPost : post);
                } else {
                    return [...prevPosts, newPost];
                }
            });
            setTitle('');
            setBody('');
        } catch (error) {
            console.error("Ошибка при создании/редактировании поста:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Заголовок" 
                required 
            />
            <textarea 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                placeholder="Содержимое" 
                required 
            />
            <button type="submit">{postToEdit ? 'Сохранить' : 'Добавить пост'}</button>
        </form>
    );
};

export default PostForm;

