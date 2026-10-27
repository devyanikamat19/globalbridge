import { postsDb } from '@/app/lib/db';
import { createPostAction, deletePostAction } from '@/app/actions/postActions';

export default function PostsDemoPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Experiment 4: Route Handlers & Server Actions</h2>

      {/* Form using native React Server Action (Zero Fetch Boilerplate) */}
      <div style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Add Post via Server Action</h3>
        <form action={createPostAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            name="title" 
            placeholder="Post Title" 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555' }} 
          />
          <textarea 
            name="content" 
            placeholder="Post Content" 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555' }} 
          />
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Submit via Server Action
          </button>
        </form>
      </div>

      {/* Rendered Post List */}
      <h3>Posts List (Direct DB / State Reading)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {postsDb.map((post) => (
          <div key={post.id} style={{ border: '1px solid #444', padding: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{post.title}</h4>
              <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>{post.content}</p>
            </div>
            
            {/* Inline Server Action triggering deletion */}
            <form action={deletePostAction.bind(null, post.id)}>
              <button type="submit" style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
