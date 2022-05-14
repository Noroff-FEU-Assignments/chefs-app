import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../utilities/Spinner.jsx";
import { marked } from "marked";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';



function RecipeDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [auth, setAuth] = useContext()

  const {id} = useParams();

  const detailsURL = api + "/recipes/" + id;

  useEffect( () => {
    async function recipe() {
      try {
        const response = await fetch(detailsURL);

        if (response.ok) {
          const results = await response.json();
          setDetails(results.data.attributes);
          
        }

      } catch(error) {
        console.log(error)

      } finally {
        setLoading(false)
      }
    }
    recipe();
  }, [detailsURL]);
  
  console.log(details);
  if (loading) {
    return <Spinner />
  }

  const getMarkdownText = (text) => {
    const formattedText = marked(text);
    return { __html: formattedText };
  };

  return (
    <>
    <Helmet>
      <title>{details.name}</title>
    </Helmet>
    <HeadingPage>{details.name}</HeadingPage>
    <div id="recipeContainer">
      <div id="ingredients">
        <h2>Ingredients</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.ingredients)}></div>
      </div>
      {/* <div className="separator"></div> */}
      <div id="instructions">
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={getMarkdownText(details.instructions)}></div>
      </div>
    </div>
    <div id="admin-buttons">
      <button type="button" className="edit-btn">Edit <FontAwesomeIcon icon={solid('pen')}/></button>
      <button type="button" className="delete-btn">Delete <FontAwesomeIcon icon={solid('trash')}/></button>
    </div>
    </>
  )
}

export default RecipeDetails
