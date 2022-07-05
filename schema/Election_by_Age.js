cube(`ElectionAnswer_by_age`, {
  dataSource: 'transactions',
  title: `Election Answer by age`,
  sql: `
  SELECT * FROM (
    SELECT  table_A.Answer_Content age,  table_B.Answer_Content answer,  
    count(table_A.user_id) countAge, Round(
    count(table_A.user_id) / table_C.countAge * 100,0) percentage 
    FROM 
      (
        SELECT  CASE 
          WHEN Answer_code = 1 THEN 'GEN-Z'
          WHEN Answer_code = 2 THEN 'MILLS'
          WHEN Answer_code = 3 THEN 'GEN-X'
          WHEN Answer_code = 4 THEN 'BABY BOOMERS'
          ELSE 'SILENT + GREATEST'
        END Answer_Content,   user_id 
        FROM  election_answers
        where  Question_Variable = 'agegroup1'
      ) table_A 
      LEFT JOIN (
        SELECT Answer_Content,   user_id 
        FROM  election_answers
        where 
        ( ${FILTER_PARAMS.ElectionAnswer_by_age.questionCodeHack.filter(
          'Question_Variable'
        )})
      ) table_B ON table_A.user_id = table_B.user_id 
      LEFT JOIN (
        SELECT  CASE 
          WHEN Answer_code = 1 THEN 'GEN-Z'
          WHEN Answer_code = 2 THEN 'MILLS'
          WHEN Answer_code = 3 THEN 'GEN-X'
          WHEN Answer_code = 4 THEN 'BABY BOOMERS'
          ELSE 'SILENT + GREATEST'
        END Answer_Content, count(user_id) countAge 
        FROM election_answers
        where  Question_Variable = 'agegroup1' 
        GROUP by  1
      ) table_C ON table_C.Answer_Content = table_A.Answer_Content 
    Group by  1,2,table_C.countAge
  ) AS final_results
  `,
  dimensions: {
    age: {
      title: `Age Group`,
      sql: `${CUBE}."age"`,
      type: `string`,
    },
    answer: {
      title: `Answer`,
      sql: `${CUBE}."answer"`,
      type: `string`,
    },
    countAge: {
      title: `Individuals`,
      sql: `${CUBE}."countAge"`,
      type: `string`,
    },
    percentage: {
      title: `Percentage`,
      sql: `CONCAT(${CUBE}."percentage", '%')`,
      type: `string`,
    },
    questionCodeHack: {
      sql: `'1'`,
      type: `string`,
    },
  },
  preAggregations: {},
});
