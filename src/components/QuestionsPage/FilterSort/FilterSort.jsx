import styles from "./styles.module.css";
import { useForm } from "react-hook-form";

function FilterSort( {handleFilter, handleSort} ) {

  const { register, handleSubmit } = useForm({
    defaultValues: {
      filter: 'allQuestions',
      sort: ''
    }
  });

  const onSubmit = data => {
    handleFilter(data.filter);
    handleSort(data.sort);
  };

  return (
    <div className={styles.filterSort}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filterSortInput}>
          <div className={styles.filter}>
            <p>Filter by</p>
            <label htmlFor="field-allQuestions">
              <input 
                {...register("filter")}
                type="radio"
                value="allQuestions"
                id="field-allQuestions"
              />
              All questions
            </label>
            <label htmlFor="field-noAnswers">
              <input 
                {...register("filter")}
                type="radio"
                value="noAnswers"
                id="field-noAnswers"
              />
              No answers
            </label>
            <label htmlFor="field-withAnswers">
              <input 
                {...register("filter")}
                type="radio"
                value="withAnswers"
                id="field-withAnswers"
              />
              Only answered
            </label>
          </div>
          <div className={styles.sort}>
            <p>Sort by</p>
            <label htmlFor="field-mostAnswers">
              <input 
                {...register("sort")}
                type="radio"
                value="mostAnswers"
                id="field-mostAnswers"
              />
              Most answers
            </label>
            <label htmlFor="field-leastAnswers">
              <input 
                {...register("sort")}
                type="radio"
                value="leastAnswers"
                id="field-leastAnswers"
              />
              Least answers
            </label>
          </div>
        </div>
        <div className={styles.filterSortButton}>
          <button type="submit">Apply</button>
        </div>
      </form>
    </div>
  );
}

export default FilterSort;