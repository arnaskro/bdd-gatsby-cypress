import React from 'react';
import { gql, useQuery } from "@apollo/client"
import { Link } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import moment from "moment"

const ProjectsPage = () => {
  const {data, loading, error} = useQuery(gql`
    query {
      projects {
        id
        name
        startDate
        endDate
      }
    }
  `);

  if (loading) {
    return <p><em>Loading...</em></p>;
  }
  if (error) {
    return <p><em>{error.message}</em></p>;
  }

  if (!data.projects) {
    return <p><em>No active projects.</em></p>;
  }

  return (
    <ul className="projects">
      {data.projects.filter(project => moment(project.endDate).diff(moment()) > 0).map(project => (
        <li key={project.id}><Link to={`/project/${project.id}`}>{project.name}</Link></li>
      ))}
    </ul>
  );
};

const ProjectsPageLayout = () => (
  <Layout>
    <SEO title="Projects" />
    <h2>Projects</h2>
    <ProjectsPage/>
  </Layout>
);

export default ProjectsPageLayout;
