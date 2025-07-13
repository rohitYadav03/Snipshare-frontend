import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NewSnippet from "./components/NewSnippet.jsx";
import MySnippets from "./components/MySnippet.jsx";
import EditSnippet from "./components/EditSnippett.jsx";
import ViewSnippet from "./components/ViewSnippet.jsx";
import NotFound from "./components/NotFound.jsx";
import PublicSnippet from "./components/PublicSnippet.jsx";
function App() {
  return (
    <Routes>

  <Route path="/" element={<AppLayout />}>
  <Route index element={<Home />} />
  <Route path="login" element={<Login />} />
  <Route path="signup" element={<Signup />} />
</Route>

<Route path="/dashboard"  element={ 
  <PrivateRoute>
  <Dashboard />
</PrivateRoute>} 
/>

<Route path="snippets/new" element={
  <PrivateRoute>
    <NewSnippet />
  </PrivateRoute>
} />

<Route path="snippets" element={
  <PrivateRoute>
    <MySnippets />
  </PrivateRoute>
}/>

<Route
  path="/snippets/:id"
  element={
    <PrivateRoute>
      <ViewSnippet />
    </PrivateRoute>
  }
/>

<Route
  path="/snippets/:id/edit"
  element={
    <PrivateRoute>
      <EditSnippet />
    </PrivateRoute>
  }
/>
<Route path="/snippets/public/:id" element={<PublicSnippet />} />
<Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
