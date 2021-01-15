import React from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import API from "./utils/API";
import "./App.css";

class App extends React.Component {
  state = {
    allUsers: [],
    searchTerm: "",
    sortAscending: true,
    filteredUsers: [],
  };
  // component did mount
  componentDidMount() {
    API.getUsers()
      .then((res) => {
        const employees = res.data.results;
        console.log(employees);
        this.setState({
          allUsers: employees,
          filteredUsers: employees,
        });
      })
      .catch((err) => console.log(err));
  }
  // call API
  handleInputChange = (event) => {
    let filtered = this.state.allUsers;
    const search = event.target.value;
    filtered = this.state.allUsers.filter((user) =>
      user.name.first.toLowerCase().includes(search.toLowerCase())
    );

    this.setState({ filteredUsers: filtered });
    this.setState({ searchTerm: search });
  };

  handleSortClick = () => {
    let sorted = [];
    if (this.state.sortAscending) {
      sorted = this.state.allUsers.sort(function (a, b) {
        if (a.name.first < b.name.first) {
          return -1;
        }
        if (a.name.first > b.name.first) {
          return 1;
        }

        return 0;
      });
      this.setState({ sortAscending: false });
    } else {
      sorted = this.state.allUsers.sort(function (a, b) {
        if (a.name.first < b.name.first) {
          return 1;
        }
        if (a.name.first > b.name.first) {
          return -1;
        }

        return 0;
      });
      this.setState({ sortAscending: true });
    }
    this.setState({ filteredUsers: sorted });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <SearchBox
            handleInputChange={this.handleInputChange}
            search={this.state.searchTerm}
          />
          <SearchResults
            filteredUsers={this.state.filteredUsers}
            handleSortClick={this.handleSortClick}
          />
          <Footer />
        </Container>
      </div>
    );
  }
}
export default App;
