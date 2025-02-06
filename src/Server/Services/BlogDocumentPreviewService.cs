using Kjac.HeadlessPreview.Models;
using Kjac.HeadlessPreview.Services;
using Umbraco.Cms.Core.Models;

namespace Server.Services;

public class BlogDocumentPreviewService : IDocumentPreviewService
{
    private const string PreviewHost = "https://localhost:3000";

    private const string PreviewSecret = "super-secret-preview-key";

    public Task<DocumentPreviewUrlInfo> PreviewUrlInfoAsync(IContent document, string? culture, string? segment)
    {
        var redirect = document.ContentType.Alias switch
        {
            "post" => $"/posts/preview-{document.Key}",
            "posts" => "/",
            _ => throw new ArgumentException($"Unsupported document type: {document.ContentType.Alias}", nameof(document))
        };

        return Task.FromResult(new DocumentPreviewUrlInfo
        {
            PreviewUrl = $"{PreviewHost}/api/preview?secret={PreviewSecret}&redirect={redirect}",
        });
    }
}
