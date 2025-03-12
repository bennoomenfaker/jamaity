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
  Divider,
} from "@mui/material";
import { fetchReportById } from "../services/api";

const ReportComponent = () => {
  const { id } = useParams();
  const [report, setReport] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportData = await fetchReportById(id);
        setReport(reportData); // Assuming the correct report data is fetched here.
      } catch (error) {
        console.error("Failed to fetch report:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      {report && report.title ? (
        <Card>
          <CardContent>
            {/* Headline Section */}
            {report.headline && (
              <div>
                {/* Headline Image */}
                {report.headline.image && report.headline.image.url && (
                  <img
                    src={report.headline.image.url}
                    alt={report.headline.image.filename}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      marginBottom: "20px",
                    }}
                  />
                )}

                {/* Headline Title */}
                <Typography variant="h5" component="h3" gutterBottom>
                  {report.headline.title}
                </Typography>

                {/* Headline Summary */}
                {report.headline.summary && (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {report.headline.summary}
                  </Typography>
                )}
                <Divider style={{ margin: "20px 0" }} />
              </div>
            )}

            {/* Title */}
            <Typography variant="h4" component="h2" gutterBottom>
              {report.title}
            </Typography>

            {/* Status */}
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Status: {report.status}
            </Typography>

            <Divider style={{ margin: "20px 0" }} />

            {/* Description (Body) */}
            <Typography variant="body1" component="div">
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: report.body,
                }}
              />
            </Typography>

            <Divider style={{ margin: "20px 0" }} />

            {/* Files Section */}
            <Typography variant="h6" gutterBottom>
              Attached Files:
            </Typography>
            {report.files && report.files.length > 0 ? (
              <Grid container spacing={2}>
                {report.files.map((file) => (
                  <Grid item key={file.id} xs={12} sm={6} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        {/* File Name */}
                        <Typography variant="body2" gutterBottom>
                          {file.filename} ({(file.filesize / 1024).toFixed(2)} KB)
                        </Typography>

                        {/* Download Link */}
                        <Link
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          Download
                        </Link>

                        {/* Thumbnail Preview (if available) */}
                        {file.preview && file.preview["url-thumb"] && (
                          <div style={{ marginTop: "10px" }}>
                            <img
                              src={file.preview["url-thumb"]}
                              alt={file.filename}
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2">No files attached.</Typography>
            )}

            <Divider style={{ margin: "20px 0" }} />

            {/* Themes Section */}
            <Typography variant="h6" gutterBottom>
              Themes:
            </Typography>
            {report.themes && report.themes.length > 0 ? (
              report.themes.map((theme) => (
                <Chip
                  key={theme.id}
                  label={theme.name}
                  color="primary"
                  style={{ marginRight: "5px", marginBottom: "5px" }}
                />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No themes available.
              </Typography>
            )}

            <Divider style={{ margin: "20px 0" }} />

            {/* Source Section */}
            <Typography variant="h6" gutterBottom>
              Source:
            </Typography>
            {report.source && report.source.length > 0 ? (
              <Typography variant="body2">
                {report.source[0].name} -{" "}
                <Link
                  href={report.source[0].homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Visit Source
                </Link>
              </Typography>
            ) : (
              <Typography variant="body2">No source available.</Typography>
            )}

            <Divider style={{ margin: "20px 0" }} />

            {/* Report URL */}
            <Typography variant="h6" gutterBottom>
              URL:
            </Typography>
            <Link
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {report.url}
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Loading report details...
        </Typography>
      )}
    </Container>
  );
};

export default ReportComponent;
