import { PostList } from "./components/PostList";
import { PostsProvider } from "./hooks/usePosts";
import { Header } from "./components/Header";
import { CreatePostForm } from "./components/CreatePostForm";

export function App() {
  return (
    <div className="App">
      <Header />
      <main className="app-content">
        <PostsProvider>
          <PostList />
          <CreatePostForm />
        </PostsProvider>
      </main>
    </div>
  );
}
