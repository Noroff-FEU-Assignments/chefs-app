import { api } from "../../constants/api.js";
import Spinner from "../../utilities/Spinner.jsx";



function searchRecipes(props) {
  const {endpoint} = props


  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  const url = api + {endpoint};

  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function getRecipes() {
      try {
        const response = await fetch(url)

        if(response.ok) {
          const results = await response.json();
          // console.log(results);
          setRecipe(results.data);
          
        }

      } catch(error) {
        console.log(error)

      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, [url])

  
  if(loading) {
    return <Spinner />
  };
  
  const searchItems = (searchValue) => {
    setSearch(searchValue)
  
    if (search !== "") {
      const filteredData = {endpoint}.filter( (recipe) => {      
      return Object.values(recipe.attributes.Name).join("").toLowerCase().includes(search.toLowerCase());
      })
      setFilteredRecipes(filteredData);
  
    } else {
      setFilteredRecipes(recipes)
    }
  }


  return (
    <div className="search">
      <input onChange={(e) => searchItems(e.target.value)} type="text" id="searchRecipe" className="search-input" placeholder="Search recipe" />
      <FontAwesomeIcon icon={solid('search')} className="search-icon" />
    </div>
  )
}

export default searchRecipes
