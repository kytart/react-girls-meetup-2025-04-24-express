import { PostList } from "./components/PostList";
import { PostsProvider } from "./hooks/usePosts";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="App">
      <Header />
      <main className="app-content">
        <PostsProvider>
          <PostList />
        </PostsProvider>
      </main>
    </div>
  );
}
