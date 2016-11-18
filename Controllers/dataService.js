app.factory('dataService', function () {
  return {
    projects: [
      {
        id: 1,
        name: "Make something good",
        taskCount: 3,
        days:
        [{
          date: "Today",
          tasks:
          [{
              id_task: 1,
              task_name: "Fix bugs",
              description: "lowercase lowercase lowercaselowercase lowercase lowercaselowercase lowercase lowercase"
            },
            {
              id_task: 2,
              task_name: "Create new bugs",
              description: "lowercadazdbnxvmb,nvbxc xn zdfghjgzfgzdhcg zgdhgdzhxfj gzdgse"
            }]
        },
        {
          date: "18.11.2016",
          tasks:
          [{
            id_task: 3,
            task_name: "Just",
            description: "lowercase lowercase lowease"
          }]
        }]
      },
      {
        id: 2,
        name: "Monce again",
        taskCount: 2,
        days:
        [{
          date: "18.11.2016",
          tasks:
          [{
            id_task: 4,
            task_name: "Fix bugs 321",
            description: "lowercase lowercase lowercaselowercase lowercase lowercaselowercase lowercase lowercase"
          }]
        },
        {
          date: "18.11.2016",
          tasks:
          [{
            id_task: 5,
            task_name: "Just4 4",
            description: "lowercase lowercase lowease"
          }]
        }]
      }
    ]
  }
});
