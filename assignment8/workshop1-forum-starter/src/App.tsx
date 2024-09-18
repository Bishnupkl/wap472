import './App.scss'
import avatar from './images/bozai.png'
import { useState } from 'react'

// Comment List data
const defaultList = [
    {
        rpid: 3,
        user: {
            uid: '13258165',
            avatar: '',
            uname: 'Jay Zhou',
        },
        content: 'Nice, well done',
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: 'Song Xu',
        },
        content: 'I search for you thousands of times, from dawn till dusk.',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: 'John',
        },
        content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
        ctime: '10-19 09:00',
        like: 66,
    },
]

// current logged-in user info
const loggedUser = {
    uid: '30009257',
    avatar,
    uname: 'John',
}

// Nav Tab
const tabs = [
    { type: 'hot', text: 'Top' },
    { type: 'newest', text: 'Newest' },
]

const App = () => {
    const [comments, setComments] = useState(defaultList)
    const [activeTab, setActiveTab] = useState('hot')
    const [newComment, setNewComment] = useState('')

    // Handle delete comment
    const handleDelete = (rpid: number) => {
        setComments(comments.filter(comment => comment.rpid !== rpid))
    }

    // Handle sorting of comments
    const sortedComments = () => {
        if (activeTab === 'hot') {
            return [...comments].sort((a, b) => b.like - a.like)
        } else {
            // @ts-ignore
            return [...comments].sort((a, b) => new Date(b.ctime) - new Date(a.ctime))
        }
    }

    // Handle posting a new comment
    const handlePostComment = () => {
        if (newComment.trim()) {
            const newCommentData = {
                rpid: comments.length + 1,
                user: loggedUser,
                content: newComment,
                ctime: new Date().toLocaleString(),
                like: 0,
            }
            setComments([newCommentData, ...comments])
            setNewComment('') // Clear textarea after posting
        }
    }

    return (
        <div className="app">
            {/* Nav Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">Comments</span>
                        <span className="total-reply">{comments.length}</span>
                    </li>
                    <li className="nav-sort">
                        {tabs.map(tab => (
                            <span
                                key={tab.type}
                                className={`nav-item ${activeTab === tab.type ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.type)}
                            >
                                {tab.text}
                            </span>
                        ))}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* Post comment */}
                <div className="box-normal">
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={loggedUser.avatar} alt="Profile" />
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        <textarea
                            className="reply-box-textarea"
                            placeholder="Tell something..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="reply-box-send" onClick={handlePostComment}>
                            <div className="send-text">Post</div>
                        </div>
                    </div>
                </div>

                {/* Comment list */}
                <div className="reply-list">
                    {sortedComments().map((comment) => (
                        <div key={comment.rpid} className="reply-item">
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        src={comment.user.avatar || './images/default-avatar.png'}
                                        alt="User avatar"
                                    />
                                </div>
                            </div>
                            <div className="content-wrap">
                                <div className="user-info">
                                    <div className="user-name">{comment.user.uname}</div>
                                </div>
                                <div className="root-reply">
                                    <span className="reply-content">{comment.content}</span>
                                    <div className="reply-info">
                                        <span className="reply-time">{comment.ctime}</span>
                                        <span className="reply-like">Like: {comment.like}</span>
                                        {comment.user.uid === loggedUser.uid && (
                                            <span
                                                className="delete-btn"
                                                onClick={() => handleDelete(comment.rpid)}
                                            >
                                                Delete
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
