import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Chip,
} from "@mui/material";
import { fetchJobById } from "../services/api";

const JobComponent = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const jobData = await fetchJobById(id);
      setJob(jobData);
    };

    fetchData();
  }, [id]);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Job Details
          </Typography>

          {job.fields && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Status:</strong> {job.fields.status}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Description:</strong>
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.fields["body-html"],
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>How to Apply:</strong>{" "}
                    <Link
                      href={job.fields.how_to_apply}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Here
                    </Link>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Experience:</strong>{" "}
                    {job.fields.experience && job.fields.experience[0]?.name}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Career Categories:</strong>{" "}
                    {job.fields.career_categories &&
                      job.fields.career_categories
                        .map((category) => category.name)
                        .join(", ")}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <strong>Themes:</strong>{" "}
                    {job.fields.theme &&
                      job.fields.theme.map((theme) => (
                        <Chip
                          key={theme.name}
                          label={theme.name}
                          style={{ margin: "2px" }}
                          color="primary"
                          size="small"
                        />
                      ))}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default JobComponent;
