import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalProvider } from "../_context/ModalContext";
import Login from "../app/Login";
import Register from "../app/Register";
import ProtectRoute from "./ProtectRoute";
import Dashboard from "../app/Dashboard";
import NotProtectRoute from "./NotProtectRoute";
import AbstractCrud from "../app/dashboard/AbstracCrud";
import AbstractUniqueCrud from "../app/dashboard/AbstractUniqueCrud";
import ProjectManualCrud from "../app/manual/project/ProjectManualCurd";
import ProjectUniqueCrud from "../app/manual/project/ProjectUniqueCrud";
import AbstractReportDocument from "../app/dashboard/AbstractReportDocument";
import DashboardTemplate from "../UI/_template/DashboardTemplate";
import ProjectPageCreate from "../app/manual/project/ProjectPageCreate";
import AbstractReportUniqueDocument from "../app/dashboard/AbstractReportUniqeuDocument";
import ProjectReportDocument from "../app/manual/project/ProjectReportDocument";
import ProjectReportUniqueDocument from "../app/manual/project/ProjectReportUniqeuDocument";
// import ProfilePage from "../app/profile/ProfilePage";
import ReportProject from "../app/report/ReportProject";
import Biblioteca from "../app/public/Biblioteca";
import CompletedDataUser from "../UI/_organism/CompletedDataUser";

const router = createBrowserRouter([
    {
        path: `/`,
        element: <Biblioteca />
    }, {
        path: ``,
        element: <NotProtectRoute />,
        children: [
            {
                path: `/login`,
                element: <Login />
            }, {
                path: `/register`,
                element: <Register />
            }
        ]
    }, {
        path: `/`,
        element: <ProtectRoute />,
        children: [
            {
                path: `/profile`,
                element: <DashboardTemplate><CompletedDataUser /></DashboardTemplate>
            },
            {
                path: `/report`,
                element: <DashboardTemplate><ReportProject /></DashboardTemplate>
            },
            {
                path: `/dashboard`,
                element: <DashboardTemplate><Dashboard /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud`,
                element: <DashboardTemplate><AbstractCrud /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud/:id`,
                element: <DashboardTemplate><AbstractUniqueCrud /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud/report/:type/`,
                element: <div className="min-h-screen w-full"><AbstractReportDocument /></div>
            },
            {
                path: `/dashboard/:crud/report/:type/:id`,
                element: <div className="min-h-screen w-full"><AbstractReportUniqueDocument /></div>
            },
            {
                path: `/project`,
                element: <DashboardTemplate><ProjectManualCrud /></DashboardTemplate>
            },
            {
                path: `/project/report/:type/`,
                element: <div className="min-h-screen w-full"><ProjectReportDocument /></div>
            },
            {
                path: `/project/report/:type/:id`,
                element: <div className="min-h-screen w-full"><ProjectReportUniqueDocument /></div>
            },
            {
                path: `/project/create`,
                element: <DashboardTemplate><ProjectPageCreate /></DashboardTemplate>
            },
            {
                path: `/project/:id`,
                element: <DashboardTemplate><ProjectUniqueCrud /></DashboardTemplate>
            },
        ]
    }
]);

export default function AppRouter () {

    // const modal = useModal();

    return (
        <>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </>
    )
}
