import { PostList } from "./components/PostList";
import { PostsProvider } from "./hooks/usePosts";
import { Header } from "./components/Header";
import { CreatePostForm } from "./components/CreatePostForm";
import { AuthProvider } from "./hooks/useAuth";

export function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main className="app-content">
          <PostsProvider>
            <PostList />
            <CreatePostForm />
          </PostsProvider>
        </main>
      </div>
    </AuthProvider>
  );
}
