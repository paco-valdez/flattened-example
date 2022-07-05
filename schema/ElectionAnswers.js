cube(`ElectionAnswers`, {
  dataSource: 'transactions',

  sql: `SELECT  
          user_id,
          question_variable,
          answer_content,
          MAX(CASE WHEN Question_Variable IN ('agegroup1') THEN
            CASE
              WHEN Answer_code = 1 THEN 'GEN-Z'
              WHEN Answer_code = 2 THEN 'MILLS'
              WHEN Answer_code = 3 THEN 'GEN-X'
              WHEN Answer_code = 4 THEN 'BABY BOOMERS'
              ELSE 'SILENT + GREATEST'
            END
          END) OVER(PARTITION BY user_id) AS age,
          MAX(CASE WHEN Question_Variable IN ('country') THEN
            Answer_content
          END) OVER(PARTITION BY user_id) AS country,
          MAX(CASE WHEN Question_Variable IN ('educ_US2') THEN
            Answer_content
          END) OVER(PARTITION BY user_id) AS education,
          MAX(CASE WHEN Question_Variable IN ('gender2') THEN
            Answer_content
          END) OVER(PARTITION BY user_id) AS gender,
          MAX(CASE WHEN Question_Variable IN ('ethnicity2', 'latin2') THEN
            CASE
                WHEN Answer_content = 'Yes, Hispanic' THEN 'HISPANIC'
                WHEN Answer_content = 'African American or Black' THEN 'AF AM'
                WHEN Answer_content = 'Asian American' THEN 'ASIAN AM'
                WHEN Answer_content = 'Caucasian or White' THEN 'WHITE'
                ELSE 'ALL NON WHITE'
            END
          END) OVER(PARTITION BY user_id) AS ethnicity,
          MAX(CASE WHEN Question_Variable IN ('marital2') THEN
            Answer_content
          END) OVER(PARTITION BY user_id) AS marital,
          COUNT(user_id) OVER(PARTITION BY question_variable) AS total_users_by_q
        FROM  election_answers
        -- GROUP BY 1, 2, 3
  `,
  //WHERE ( ${FILTER_PARAMS.ElectionAnswers.questionCodeHack.filter(
  //               "Question_Variable"
  //             )})
  measures: {
    uniqueUserCount: {
      sql: `user_id`,
      type: 'countDistinct',
    },
    userCountPercentage: {
      sql: `count(user_id) / (max(total_users_by_q) * 1.0) * 100`,
      type: `number`,
      format: `percent`,
    },
    totalUsersByQ: {
      sql: `max(total_users_by_q)`,
      type: `number`,
    },
  },
  dimensions: {
    question_variable: {
      sql: `question_variable`,
      type: `string`
    },
    answer_content: {
      sql: `answer_content`,
      type: `string`
    },
    age: {
      sql: `age`,
      type: `string`
    },

    country: {
      sql: `country`,
      type: `string`
    },
    education: {
      sql: `education`,
      type: `string`
    },
    gender: {
      sql: `gender`,
      type: `string`
    },
    ethnicity: {
      sql: `ethnicity`,
      type: `string`
    },
    marital: {
      sql: `marital`,
      type: `string`
    },
    updatedAt: {
      sql: '_updated_at',
      type: 'time'
    },
    questionCodeHack: {
      sql: `'1'`,
      type: `string`,
    },
  },
});