using api.Models;
using Newtonsoft.Json;

namespace api.Core.Extensions;
internal static class ModelExtensions
{
    internal static string CreateUriArrayString(this AddTracksRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Uris)) return string.Empty;

        var uriArray = req.Uris.Split(';');
        if (!uriArray.Any()) return string.Empty;

        var trailing = "spotify:track:";
        var uriList = new List<string>();
        foreach (var uri in uriArray)
        {
            if (uri.StartsWith(trailing)) uriList.Add(uri);
            else uriList.Add($"{trailing}{uri}");
        }

        return JsonConvert.SerializeObject(uriList);
    }

    internal static IEnumerable<string> CreateQueryArray(this SearchRequest req)
    {
        var queryList = new List<string>();
        if (string.IsNullOrWhiteSpace(req.Content)) return queryList;

        var tracks = req.Content.Split(';');
        if (!tracks.Any()) return queryList;
        foreach (var artistAndTrack in tracks)
        {
            var artistTrackArray = artistAndTrack.Split("-");
            if (!artistTrackArray.Any()) continue;

            var artist = TrimAndReplaceWhiteSpace(artistTrackArray[0]);
            var track = TrimAndReplaceWhiteSpace(artistTrackArray[1]);
            var query = $"query=artist:{artist}%20track:{track}&type=track";
            queryList.Add(query);
        }

        return queryList;
    }

    internal static SearchTracksSummary SkipWrapperAndMerge(this SearchTracksWrapper?[]? wrapper)
    {
        if (wrapper == null) return new SearchTracksSummary();
        return wrapper
            .Where(x =>
                x != null &&
                x.TrackSummaries != null &&
                x.TrackSummaries.Tracks != null &&
                x.TrackSummaries.Tracks.Any())
            .Aggregate(new SearchTracksSummary(), (accumulate, current) =>
            {
                var currentTrackSummary = current!.TrackSummaries!;
                var currentTracks = currentTrackSummary.Tracks.Where(x => x != null).ToList();

                accumulate.Tracks.AddRange(currentTracks);
                accumulate.Total += currentTrackSummary.Total;

                var nullTracks = currentTrackSummary.Tracks.Where(x => x == null).ToList();
                accumulate.Total -= nullTracks.Count();

                return accumulate;
            });
    }


    private static string TrimAndReplaceWhiteSpace(string input) => input.Trim().Replace(" ", "%20");
}