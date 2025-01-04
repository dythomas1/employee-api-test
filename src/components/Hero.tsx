import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { doGet, HttpResponse } from "../utils/api.ts";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const HeroContent = () => {
  const [apiMessage, setApiMessage] = useState("");
  
  const getData = useQuery({
    queryKey: ["eventCategory"],
    queryFn: () =>
        doGet('http://localhost:3001/api/messages/public').then(
            (res: HttpResponse) => res?.data
        ),
    enabled: true,
    retryOnMount: true,
    retryDelay: (attempt: number) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    meta: { persist: false },
  });

  useEffect(() => {
    if (getData.data?.message) {
      setApiMessage(getData.data.message);
    }
  }, [getData.data]);

  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
      <h1 className="mb-4">React.js Sample Project</h1>
      <p className="lead">
        This is a sample application that demonstrates an authentication flow for
        an SPA, using <a href="https://reactjs.org">React.js</a>
      </p>
      
      <button 
        className="btn btn-primary"
        onClick={() => getData.refetch()}
        disabled={getData.isFetching}
      >
        {getData.isFetching ? 'Loading...' : 'Get API Message'}
      </button>
      
      {getData.data?.message && (
        <h1 className="mt-3">
          API Message: {getData.data.message}
        </h1>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroContent />
    </QueryClientProvider>
  );
};

export default Hero;
