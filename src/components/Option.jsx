import React from 'react'
import '../index.css'

const Option = (props) => {
  const categoryArr = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathmatics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"  ]
  const [category, setCategory] = React.useState(9);
  const [difficulty, setDifficulty] = React.useState('easy');


  const updatedCategoryArr = categoryArr.map((category, index) => ({ name: category, num: index + 9 }))

  const categoryOptionsEl = updatedCategoryArr.map(categori => {
    return (
    <option
      value={categori.num}
    >
      {categori.name}
    </option>)
  })

  

  const handleCategorieChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value)
  };

  const handleDifficulteChange = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.startQuizz(category,difficulty.toLowerCase())
  };

  return (
    <div>
        <form>
        <div>
          <label htmlFor="category">Category :</label>
          <select id="category" name="category" value={category} onChange={handleCategorieChange}>
            <option value="" disabled>-Select a category-</option>
            {categoryOptionsEl}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="difficulty">Difficulty :</label>
          <select id="difficulty" name="difficulty" value={difficulty} onChange={handleDifficulteChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
          <button className='btn btn-start'
                onClick={handleSubmit}
                >
                Start quiz
            </button>
      </form>

    </div>
  )
}

export default Option