using Google.Protobuf;

using Grpc.Core;

namespace Sisa.Grpc;

public interface IFileContentParams
{
    ByteString Chunk { get; }
}

public interface IFileStream<T>
    where T : class, IFileContentParams
{
    T Content { get; }
}

public class DirectFileStream<C, T> : Stream
    where C : class, IFileStream<T>
    where T : class, IFileContentParams
{
    private readonly IAsyncStreamReader<C> _requestStream;
    private byte[] _buffer = [];
    private int _position;
    private int _length;

    public DirectFileStream(IAsyncStreamReader<C> requestStream)
    {
        _requestStream = requestStream;
    }

    public override bool CanRead => true;

    public override bool CanSeek => false;

    public override bool CanWrite => false;

    public override long Length => _length;

    public override long Position { get => _position; set => throw new NotImplementedException(); }

    public override void Flush()
    {
        throw new NotImplementedException();
    }

    public override int Read(byte[] buffer, int offset, int count)
    {
        if (_buffer == null || _position == _length)
        {
            // Read the next chunk from the request stream
            if (!_requestStream.MoveNext(default).Result) return 0; // End of stream

            var chunk = _requestStream.Current.Content.Chunk;

            _buffer = chunk.ToByteArray();
            _position = 0;
            _length = _buffer.Length;
        }

        // Copy from the buffer to the destination array
        var available = _length - _position;
        var bytesToCopy = Math.Min(available, count);
        Buffer.BlockCopy(_buffer, _position, buffer, offset, bytesToCopy);
        _position += bytesToCopy;
        return bytesToCopy;
    }

    public override long Seek(long offset, SeekOrigin origin)
    {
        throw new NotImplementedException();
    }

    public override void SetLength(long value)
    {
        throw new NotImplementedException();
    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        throw new NotImplementedException();
    }

}