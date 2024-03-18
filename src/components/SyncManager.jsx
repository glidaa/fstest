import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as appActions from "../actions/app"
import * as notificationsActions from "../actions/notifications"
import * as projectsActions from "../actions/projects"
import * as tasksActions from "../actions/tasks"
import * as userActions from "../actions/user"
import * as usersActions from "../actions/users"
<<<<<<< HEAD
// import * as queries from "../graphql/queries"
=======
import * as queries from "../graphql/queries"
>>>>>>> main
import * as cacheController from "../controllers/cache"
import { panelPages, AuthState } from '../constants';
import store from "../store";
import { navigate, useRouterNoUpdates } from "./Router"
import sortByRank from "../utils/sortByRank"
<<<<<<< HEAD
// import API from "../amplify/API"
// import PubSub from "../amplify/PubSub"
=======
import API from "../amplify/API"
import PubSub from "../amplify/PubSub"
>>>>>>> main

const SyncManager = () => {
  const [isInitial, setIsInitial] = useState(true)
  const { routeParams } = useRouterNoUpdates();
  const dispatch = useDispatch()

  const isOffline = useSelector(state => state.app.isOffline)
  const selectedProject = useSelector(state => state.selectedProject)
  const selectedTask = useSelector(state => state.selectedTask)

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.state === AuthState.SignedIn) {
      if (isInitial) {
        setIsInitial(false)
      } else if (isOffline) {
<<<<<<< HEAD
        // dispatch(appActions.setSynced(false))
        // dispatch(usersActions.addCachedUsers(cacheController.getUsers()))
        // PubSub.unsubscribeAll()
=======
        dispatch(appActions.setSynced(false))
        dispatch(usersActions.addCachedUsers(cacheController.getUsers()))
        PubSub.unsubscribeAll()
>>>>>>> main
      } else {
        (async () => {
          const currUser = await dispatch(userActions.handleFetchUser())
          if (routeParams.projectPermalink &&
            routeParams.username &&
            currUser.state === AuthState.SignedIn) {
              await dispatch(notificationsActions.handleFetchNotifications())
<<<<<<< HEAD
              // PubSub.subscribeTopic("notifications")
              await dispatch(projectsActions.handleFetchOwnedProjects(true))
              await dispatch(projectsActions.handleFetchAssignedProjects(true))
              const projects = await dispatch(projectsActions.handleFetchWatchedProjects(true))
              // PubSub.subscribeTopic("ownedProjects")
              let reqProject = Object.values(projects).filter(x => `${x.owner}/${x.permalink}` === `${routeParams.username}/${routeParams.projectPermalink}`)[0]
              if (!reqProject) {
                try {
                  // reqProject = (await API.execute(queries.getProjectByPermalink, {
                  //   permalink: routeParams.projectPermalink,
                  //   owner: routeParams.username
                  // })).data.getProjectByPermalink
                  // dispatch(projectsActions.createProject(reqProject, "temp"))
=======
              PubSub.subscribeTopic("notifications")
              await dispatch(projectsActions.handleFetchOwnedProjects(true))
              await dispatch(projectsActions.handleFetchAssignedProjects(true))
              const projects = await dispatch(projectsActions.handleFetchWatchedProjects(true))
              PubSub.subscribeTopic("ownedProjects")
              let reqProject = Object.values(projects).filter(x => `${x.owner}/${x.permalink}` === `${routeParams.username}/${routeParams.projectPermalink}`)[0]
              if (!reqProject) {
                try {
                  reqProject = (await API.execute(queries.getProjectByPermalink, {
                    permalink: routeParams.projectPermalink,
                    owner: routeParams.username
                  })).data.getProjectByPermalink
                  dispatch(projectsActions.createProject(reqProject, "temp"))
>>>>>>> main
                } catch {
                  reqProject = null
                  if (routeParams.taskPermalink) {
                    navigate(`/${routeParams.username}/${routeParams.projectPermalink}`, true)
                  }
                }
              }
              if (!(selectedProject in projects) && reqProject) {
                dispatch(appActions.handleSetProject(reqProject.id, false))
                const tasks = await dispatch(tasksActions.handleFetchTasks(reqProject.id, true))
                if (!(selectedTask in tasks) && routeParams.taskPermalink) {
                  const reqTask = Object.values(tasks).filter(x => x.permalink === parseInt(routeParams.taskPermalink, 10))[0]
                  if (reqTask) {
                    dispatch(appActions.handleSetTask(reqTask.id, false))
                    dispatch(appActions.setRightPanelPage(panelPages.TASK_HUB))
                    dispatch(appActions.handleSetRightPanel(true))
                  } else {
                    navigate(`/${routeParams.username}/${routeParams.projectPermalink}`, true)
                  }
                } else {
                  navigate(`/${routeParams.username}/${routeParams.projectPermalink}`, true)
                }
              }
          } else if (currUser.state === AuthState.SignedIn) {
            await dispatch(notificationsActions.handleFetchNotifications())
<<<<<<< HEAD
            // PubSub.subscribeTopic("notifications")
            await dispatch(projectsActions.handleFetchOwnedProjects(true))
            await dispatch(projectsActions.handleFetchAssignedProjects(true))
            const projects = await dispatch(projectsActions.handleFetchWatchedProjects(true))
            // PubSub.subscribeTopic("ownedProjects")
=======
            PubSub.subscribeTopic("notifications")
            await dispatch(projectsActions.handleFetchOwnedProjects(true))
            await dispatch(projectsActions.handleFetchAssignedProjects(true))
            const projects = await dispatch(projectsActions.handleFetchWatchedProjects(true))
            PubSub.subscribeTopic("ownedProjects")
>>>>>>> main
            const firstProject = sortByRank(Object.values(projects).filter(x => x.isOwned))?.[0]
            if (firstProject) {
              dispatch(appActions.handleSetProject(firstProject.id, false))
              navigate(`/${firstProject.permalink}`, true)
            }
          }
          if (store.getState().app.isOffline) {
            dispatch(appActions.setSynced(false))
            dispatch(usersActions.addCachedUsers(cacheController.getUsers()))
          } else {
            dispatch(appActions.setSynced(true))
          }
        })()
      }
    }
  }, [isOffline])
  return null
}

export default SyncManager;